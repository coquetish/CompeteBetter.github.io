document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.github.com/repos/{coquetish}/{CompeteBetter.gitgub.io}/issues?labels=competition')
   .then(response => response.json())
   .then(issues => {
      const competitionsContainer = document.getElementById('competitions-container');
      issues.forEach(issue => {
        const competitionItem = document.createElement('div');
        competitionItem.className = 'competition-item';
        competitionItem.innerHTML = `
          <h3>${issue.title}</h3>
          <p><a href="${issue.html_url}">更多信息</a></p>
          <p>${issue.body}</p>
        `;
        competitionsContainer.appendChild(competitionItem);
      });
    })
   .catch(error => console.error('Error fetching issues:', error));
});