document.addEventListener('DOMContentLoaded', function () {
    // 移除加载状态的元素
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }

    // 使用 GitHub API 获取 issues 数据
    fetch('https://api.github.com/repos/coquetish/CompeteBetter.github.io/issues')
       .then(response => response.json())
       .then(issues => {
            console.log('Received issues:', issues);
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

                let backgroundColor;
                if (issue.labels && issue.labels.length > 0) {
                    const randomIndex = Math.floor(Math.random() * issue.labels.length);
                    const randomLabel = issue.labels[randomIndex];
                    const decodedLabelName = decodeURIComponent(randomLabel.name);
                    console.log('Decoded label name for issue:', decodedLabelName);
                    switch (decodedLabelName) {
                        case 'A%E7%B1%BB':
                            backgroundColor = 'red';
                            break;
                        case 'B%E7%B1%BB':
                            backgroundColor = 'blue';
                            break;
                        case 'C%E7%B1%BB':
                            backgroundColor = 'green';
                            break;
                        case 'D%E7%B1%BB':
                            backgroundColor = 'orange';
                            break;
                        default:
                            backgroundColor = getRandomColor();
                    }
                } else {
                    backgroundColor = getRandomColor();
                }

                console.log('Selected background color for issue:', backgroundColor);
                competitionItem.style.backgroundColor = backgroundColor;

                competitionItem.innerHTML = `
                    <h2 class="competition-title">${formattedTitle}</h2>
                    <p class="competition-details">${formattedBody}</p>
                `;
                competitionsContainer.appendChild(competitionItem);
            });
        })
       .catch(error => {
            console.error('获取 issues 数据时出现错误：', error);
        });
});

function getRandomColor() {
    const colors = ['#ff7f50', '#87ceeb', '#da70d6', '#32cd32'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
