document.addEventListener('DOMContentLoaded', function () {
    // 移除加载状态的元素
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }

    // 使用 GitHub API 获取 issues 数据
    fetch('https://api.github.com/repos/coquetish/CompeteBetter.github.io/issues?labels=A%E7%B1%BB')
       .then(response => response.json())
       .then(issues => {
            const competitionsContainer = document.getElementById('competitions-container');
            issues.forEach(issue => {
                const competitionItem = document.createElement('div');
                competitionItem.classList.add('competition-item');
                let formattedTitle = issue.title;
                let formattedBody = issue.body;

                // 识别标题
                formattedTitle = formattedTitle.replace(/^###\s(.+)$/gm, '<h3>$1</h3>');
                formattedBody = formattedBody.replace(/^###\s(.+)$/gm, '<h3>$1</h3>');

                // 识别链接
                formattedBody = formattedBody.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

                // 处理换行
                formattedTitle = formattedTitle.replace(/\n/g, '<br>');
                formattedBody = formattedBody.replace(/\n/g, '<br>');

                competitionItem.innerHTML = `
                    <h2 class="competition-title">${formattedTitle}</h2>
                    <p class="competition-details">${formattedBody}</p>
                    <p class="competition-category">未知类别（可根据实际情况从 issue 中提取类别信息）</p>
                `;
                competitionsContainer.appendChild(competitionItem);
            });
        })
       .catch(error => {
            console.error('获取 issues 数据时出现错误：', error);
        });
});