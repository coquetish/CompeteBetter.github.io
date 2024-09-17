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

                const formattedTitle = formatText(issue.title);
                const formattedBody = formatText(issue.body);

                let backgroundColor = getBackgroundColor(issue.labels);

                console.log('Selected background color for issue:', backgroundColor);
                competitionItem.style.backgroundColor = backgroundColor;

                // 调整文字颜色为黑色以确保清晰可见
                competitionItem.style.color = '#000';

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

function formatText(text) {
    if (!text) return '';

    // 识别标题和链接
    let formattedText = text
      .replace(/^###\s(.+)$/gm, '<h3>\$1</h3>')  // 处理三级标题
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="\$2">\$1</a>')  // 处理链接
      .replace(/\n/g, '<br>');  // 处理换行

    return formattedText;
}

function getBackgroundColor(labels) {
    if (labels && labels.length > 0) {
        const randomIndex = Math.floor(Math.random() * labels.length);
        const labelName = decodeURIComponent(labels[randomIndex].name);
        console.log('Decoded label name for issue:', labelName);

        switch (labelName) {
            case 'A类':
                return '#ff6347'; 
            case 'B类':
                return '#ffa500'; 
            case 'C类':
                return '#87ceeb'; 
            case 'D类':
                return '#90ee90'; 
            default:
                return getRandomColor();
        }
    }
    return getRandomColor();
}

function getRandomColor() {
    const colors = ['#ffa07a', '#afeeee', '#d8bfd8', '#add8e6'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
