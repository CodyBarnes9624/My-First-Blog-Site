document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('submitForm');
    const blogsList = document.getElementById('blogsList');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.getElementById('body');

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    if (submitForm) {
        submitForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('first-name').value;
            const title = document.getElementById('last-name').value;
            const content = document.getElementById('email').value;

            if (username.length < 3 || title.length === 0 || content.length === 0) {
                alert("Please ensure that Username is 3 characters long, and content and title are not empty!");
            } else {
                const blog = {
                    username: username,
                    title: title,
                    content: content,
                    date: new Date().toISOString()
                };
                let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
                blogs.push(blog);
                localStorage.setItem('blogs', JSON.stringify(blogs));
                window.location.href = 'blogs.html';
            }
        });
    }

    if (blogsList) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

        if (blogs.length === 0) {
            blogsList.innerHTML = '<p>No blogs to display</p>';
        } else {
            blogs.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.classList.add('card');
                blogElement.innerHTML = `
                    <h3>${blog.title}</h3>
                    <em>by ${blog.username} on ${new Date(blog.date).toLocaleDateString()}</em>
                    <p>${blog.content}</p>
                `;
                blogsList.appendChild(blogElement);
            });
        }
    }
});