// Team contribution data is already shipped as a static CSV for the 3D visualization.
const selectedTeam = new URLSearchParams(window.location.search).get('team');

if (!selectedTeam) {
    document.getElementById('team-name').textContent = 'Choose a club';
} else {
    d3.csv('../sphere_graph/con_merge_rank_s.csv')
        .then(rows => {
            const players = rows.filter(row => row.Squad === selectedTeam);
            if (!players.length) {
                document.getElementById('team-name').textContent = 'Team not found.';
                return;
            }
            document.getElementById('PI').textContent = players.length;
            document.getElementById('team-logo').src = players[0].Squad_picture;
            document.getElementById('team-name').textContent = selectedTeam;
            document.getElementById('squad-annual-wages').textContent = players[0]['Squad Annual Wages'];
            document.getElementById('team-ranking').textContent = 'Not available';
            const container = document.getElementById('player-container');
            players.forEach(player => {
                const item = document.createElement('div');
                item.className = 'player-item';
                const img = document.createElement('img');
                img.src = player.Picture;
                img.alt = player.Player;
                item.appendChild(img);
                const name = document.createElement('strong');
                name.textContent = player.Player;
                item.appendChild(name);
                const info = document.createElement('p');
                info.textContent = `${player.Pos} | Contribution: ${player.contribution} | Annual wages: ${player['Annual Wages']}`;
                item.appendChild(info);
                container.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading team data:', error);
            document.getElementById('team-name').textContent = 'Could not load team data. Please refresh.';
        });
}
