const repoOwner = 'coquetish';
const repoName = 'CompeteBetter.github.io';

fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues?state=open`)
 .then(response => response.json())
 .then(issues => {
    // 处理获取到的 issues 数据并显示在网页上
    const competitionsContainer = document.getElementById('competitions-container');
    issues.forEach(issue => {
      const competitionItem = document.createElement('div');
      competitionItem.classList.add('competition-item');
      competitionItem.innerHTML = `
        <h2 class="competition-title">${issue.title}</h2>
        <p class="competition-details">${issue.body}</p>
      `;
      competitionsContainer.appendChild(competitionItem);
    });
  })
 .catch(error => console.error('Error fetching issues:', error));
