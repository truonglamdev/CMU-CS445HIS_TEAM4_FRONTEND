import './NotFound.css';
function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <div>Oops ! Page not found</div>
            <p>
                <a href="/">Return Home</a>
            </p>
        </div>
    );
}

export default NotFound;
