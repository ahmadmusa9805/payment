import "./App.css";
import PaymentForm from "./paymentForm";
// import ChatActorToActor from "./components/ChatActorToActor";
// import ChatAdminToActor from "./components/ChatAdminToActor";

function App() {
  // const [count, setCount] = useState(0);
  // const userRole = 'admin'
  // const UserRole = 'actor1'
  return (
    <>
     
      <div>
        {/* <h1>Community Explore</h1> */}
        {/* <div className="App">
           <ChatAdminToActor  userRole={userRole}/>
           <div ><hr /></div>
           <ChatActorToActor UserRole={UserRole}/>

         </div> */}
      </div>
      <div>
        <h1>I am payment component</h1>
         {/* <h1>Stripe Payment Integration</h1> */}
          <PaymentForm />
      </div>
    </>
  );
}

export default App;
