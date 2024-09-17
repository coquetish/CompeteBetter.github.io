document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.github.com/repos/coquetish/CompeteBetter.github.io/issues?labels=A%E7%B1%BB')
  .then(response => response.json())
  .then(issues => {
      const competitionsContainer = document.getElementById('competitions-container');
      issues.forEach(issue => {
        const competitionItem = document.createElement('div');
        competitionItem.className = 'competition-item';
        competitionItem.innerHTML = `
          <h3>${issue.title}</h3>
          <p><a href="${issue.html_url}">比赛信息</a></p>
          <p>${issue.body}</p>
        `;
        competitionsContainer.appendChild(competitionItem);
      });
    })
  .catch(error => console.error('Error fetching issues:', error));
});
