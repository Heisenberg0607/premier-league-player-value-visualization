document.addEventListener('DOMContentLoaded', async () => {
  const selector = document.getElementById('team-select');
  const status = document.getElementById('data-status');
  try {
    const [outfield, keepers] = await Promise.all([d3.json('players_data.json'), d3.json('GK_Data.json')]);
    const players = [...outfield.map(p => ({...p, name:p.player, team:p.squad, role:p.main_pos})), ...keepers.map(p => ({...p, name:p.Player, team:p.Team, role:'GK'}))];
    const teams = [...new Set(players.map(p => p.team))].sort();
    teams.forEach(team => selector.add(new Option(team, team)));
    const requested = new URLSearchParams(location.search).get('team');
    let saved; try { saved = localStorage.getItem('pvl-club'); } catch (_) {}
    selector.value = teams.includes(requested) ? requested : teams.includes(saved) ? saved : teams[0];
    const positions = {GK:[10,50], CB:[27,50], LB:[24,18], RB:[24,82], CDM:[41,50], CM:[51,50], CAM:[64,50], LM:[49,20], RM:[49,80], LW:[73,20], RW:[73,80], ST:[86,50]};
    function render() {
      const team = selector.value;
      const squad = players.filter(p => p.team === team);
      document.getElementById('team-profile').href = `team.html?team=${encodeURIComponent(team)}`;
      document.getElementById('team-name').textContent = `${team} profile`;
      document.getElementById('squad-count').textContent = `${squad.length} players in dataset`;
      const container = document.getElementById('player-markers'); container.replaceChildren();
      const groups = d3.group(squad, p => p.role);
      groups.forEach((group, role) => group.forEach((player,index) => {
        const [x,y] = positions[role] || [55,50];
        const step = Math.min(10, 65/Math.max(1,group.length-1));
        const marker = document.createElement('a'); marker.className = 'squad-marker';
        marker.style.left = `${x}%`; marker.style.top = `${Math.max(9,Math.min(88,y + (index-(group.length-1)/2)*step))}%`;
        marker.href = `player.html?name=${encodeURIComponent(player.name)}`;
        marker.title = `${player.name} · ${role}`; marker.setAttribute('aria-label', `View ${player.name}, ${role}`);
        const image = document.createElement('img'); image.src = player.player_img; image.alt = ''; image.loading = 'lazy';
        image.addEventListener('error', () => { image.remove(); marker.classList.add('avatar-fallback'); }, {once:true});
        const initials = document.createElement('span'); initials.className = 'marker-initials'; initials.textContent = player.name.split(' ').map(n=>n[0]).slice(0,2).join('');
        const label = document.createElement('span'); label.className = 'marker-name'; label.textContent = player.name;
        marker.append(initials,image,label); container.append(marker);
      }));
      status.hidden = true;
      try { localStorage.setItem('pvl-club',team); } catch (_) {}
    }
    selector.addEventListener('change',render); render();
  } catch (error) { status.textContent = 'Could not load squad data. Please refresh to try again.'; console.error(error); }
});
