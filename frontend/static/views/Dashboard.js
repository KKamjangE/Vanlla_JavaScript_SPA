import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
        <h1>Welcome!</h1>
        <p>This is Dashborad page.</p>
        <a href="/posts" data-link>
            View recent posts
        </a>
    `;
  }
}
