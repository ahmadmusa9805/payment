import "./App.css";
import ChatActorToActor from "./components/ChatActorToActor";
// import ChatAdminToActor from "./components/ChatAdminToActor";
// import Chat from "./components/ChatAdminToActor";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>Stripe Payment Integration</h1> */}
      {/* <PaymentForm /> */}
      <div>
        <h1>Community Explore</h1>
        <div className="App">
           {/* <ChatAdminToActor /> */}
           <div ><hr /></div>
           <ChatActorToActor />

         </div>
      </div>
    </>
  );
}

export default App;
