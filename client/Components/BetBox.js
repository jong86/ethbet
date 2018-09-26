class BetBox extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
    }
  }
  
  render() {
    return `
      <div>
        <input type="text" onchange="getComp(${this.id}).setAmount(this.value)" type="number"></input>
        <button onclick="console.log(getComp(${this.id}).state.amount)">Place bet</button>
      </div>
    `
  }

  setAmount(newAmount) {
    this.state.amount = newAmount;
  }
}  

betBox = new BetBox();
document.querySelector('body').innerHTML = betBox.render();