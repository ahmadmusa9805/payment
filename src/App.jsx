import "./App.css";
import ChatActorToActor from "./components/ChatActorToActor";
import ChatAdminToActor from "./components/ChatAdminToActor";

function App() {
  // const [count, setCount] = useState(0);
  const userRole = 'admin'
  const UserRole = 'actor1'
  return (
    <>
      {/* <h1>Stripe Payment Integration</h1> */}
      {/* <PaymentForm /> */}
      <div>
        <h1>Community Explore</h1>
        <div className="App">
           <ChatAdminToActor  userRole={userRole}/>
           <div ><hr /></div>
           <ChatActorToActor UserRole={UserRole}/>

         </div>
      </div>
    </>
  );
}

export default App;
