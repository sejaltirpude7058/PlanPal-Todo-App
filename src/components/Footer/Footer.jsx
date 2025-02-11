import "./footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} PlanPal Todo App. All Rights Reserved.</p>
      <p>
        Designed by <span className="footer-highlight">Sejal Tirpude</span>
      </p>
    </footer>
  );
}

export default Footer;
