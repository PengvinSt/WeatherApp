const onEveryTick = (fn:()=>void, tick:number) => {
    let getTick = () => tick - (Date.now() % tick);
    let f = () => {
      fn();
      setTimeout(f, getTick());
    }
    setTimeout(f, getTick());
  }


export default onEveryTick