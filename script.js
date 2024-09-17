document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/repos/coquetish/CompeteBetter.github.io/issues?labels=A%E7%B1%BB')
   .then(response => response.json())
   .then(issues => {
        const competitionsContainer = document.getElementById('competitions-container');
        issues.forEach(issue => {
            const competitionItem = document.createElement('div');
            competitionItem.className = 'competition-item';
            // 引入 marked 库进行 Markdown 渲染
            const renderedBody = marked(issue.body);
            competitionItem.innerHTML = `
                <h3>${issue.title}</h3>
                <p><a href="${issue.html_url}">更多信息</a></p>
                <p>${renderedBody}</p>
            `;
            competitionsContainer.appendChild(competitionItem);
        });
    })
   .catch(error => console.error('Error fetching issues:', error));
});
