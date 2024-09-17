   document.addEventListener('DOMContentLoaded', function () {
       const competitionsContainer = document.getElementById('competitions-container');
       competitionsContainer.innerHTML = '<p>正在加载近期比赛信息...</p>';
       fetch('https://api.github.com/repos/coquetish/CompeteBetter.github.io/issues')
      .then(response => response.json())
      .then(issues => {
           competitionsContainer.innerHTML = '';
           issues.forEach(issue => {
               const competitionItem = document.createElement('div');
               competitionItem.className = 'competition-item';
               const htmlTitle = marked.parseInline(issue.title);
               const htmlBody = marked.parse(issue.body);
               competitionItem.innerHTML = `
                   <h3>${htmlTitle}</h3>
                   <p><a href="${issue.html_url}">更多信息</a></p>
                   <p>${htmlBody}</p>
               `;
               competitionsContainer.appendChild(competitionItem);
           });
       })
      .catch(error => {
           console.error('Error fetching issues:', error);
           competitionsContainer.innerHTML = '<p>无法获取近期比赛信息，请稍后再试。</p>';
       });
   });
