async function fetchData() {
  try {
    const response = await fetch("https://fakerapi.it/api/v1/credit_cards");
    const data = await response.json();

    return data?.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

class Table {
  constructor() {
    this.cards = document.querySelector("#cards");
    this.updateButton = document.querySelector("#update");
    this.data = [];

    this.init();
  }

  async init() {
    await this.getData();
    this.render();
  }

  async getData() {
    this.data = await fetchData();
  }

  makeHeader() {
    const head = this.cards.querySelector("thead");
    head.innerHTML = `
      <tr>
        <th>Bandeira</th>
        <th>Número do cartão</th>
        <th>Data de expiração</th>
        <th>Nome do cliente</th>
      </tr>
    `;
  }

  makeBody() {
    const body = this.cards.querySelector("tbody");
    body.innerHTML = this.data
      .map(
        (result) => `
        <tr>
          <td>${result.type}</td>
          <td>${result.number}</td>
          <td>${result.expiration}</td>
          <td>${result.owner}</td>
        </tr>
      `
      )
      .join("");
  }

  render() {
    this.makeHeader();
    this.makeBody();

    this.updateButton.addEventListener(
      "click",
      async () => {
        await this.getData();
        this.makeBody();
      },
      false
    );
  }
}


new Table();