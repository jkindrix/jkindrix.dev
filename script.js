document.addEventListener("DOMContentLoaded", function() {
    // Table of Contents
    var toc = document.getElementById('toc');
    if (toc) {
        var tocHtml = '<ul>';
        document.querySelectorAll('h2, h3').forEach(function(heading) {
            var linkId = heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-');
            heading.id = linkId;
            tocHtml += '<li><a href="#' + linkId + '">' + heading.innerText + '</a></li>';
        });
        tocHtml += '</ul>';
        toc.innerHTML = tocHtml;
    }

    // Responsive Sidebar
    var sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        var toggleBtn = document.createElement('button');
        toggleBtn.innerText = '☰';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '10px';
        toggleBtn.style.left = '10px';
        toggleBtn.style.zIndex = 1000;
        toggleBtn.addEventListener('click', function() {
            sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
        });
        document.body.appendChild(toggleBtn);
    }
    
    // Interactive Diagrams and Charts (example with Chart.js)
    var ctx = document.getElementById('myChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
