#!/usr/bin/env python3
"""Static source-integrity checks; does not certify browser interactivity."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import csv
import json
import sys

ROOT = Path(__file__).resolve().parent.parent

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag in {"script", "img", "link"}:
            v = attrs.get("src") or attrs.get("href")
            if v:
                self.references.append(v)

errors=[]
for html in ROOT.rglob('*.html'):
    parser=Assets()
    parser.feed(html.read_text(encoding='utf-8'))
    for value in parser.references:
        parsed=urlparse(value)
        if parsed.scheme or value.startswith(('//','#','data:')): continue
        target=(html.parent/unquote(parsed.path)).resolve()
        if not target.is_relative_to(ROOT) or not target.is_file():
            errors.append(f'Broken local reference: {html.relative_to(ROOT)} -> {value}')
    repeated={x for x in parser.ids if parser.ids.count(x)>1}
    if repeated: errors.append(f'Duplicate HTML ids in {html.relative_to(ROOT)}: {sorted(repeated)}')

for rel in ['dashboard/players_data.json','dashboard/GK_Data.json']:
    p=ROOT/rel
    try:
        records=json.loads(p.read_text(encoding='utf-8-sig'))
        assert isinstance(records,list) and len(records)>0
        print(f'JSON OK: {rel} ({len(records)} records)')
    except Exception as exc: errors.append(f'Invalid JSON {rel}: {exc}')

p=ROOT/'sphere_graph/con_merge_rank_s.csv'
try:
    with p.open(encoding='utf-8-sig', newline='') as fp:
        records=list(csv.DictReader(fp))
    assert records and {'Player','Squad','contribution','Annual Wages'} <= set(records[0])
    print(f'CSV OK: {p.relative_to(ROOT)} ({len(records)} records)')
except Exception as exc: errors.append(f'Invalid CSV: {exc}')

if errors:
    print('\n'.join(errors),file=sys.stderr)
    sys.exit(1)
print('PASS: HTML local references, duplicate IDs, JSON/CSV data')
