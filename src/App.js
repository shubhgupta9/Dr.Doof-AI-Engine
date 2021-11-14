import Header from "./header";
import Footer from "./footer";
import Search from "./search";
import Sql_container from "./sql";
import Output_container from "./output";

const App = () => {
  return (
    <div>
      <Header />
      <Search />
      <Footer />
      <Sql_container />
      <Output_container />
    </div>
  );
};

export default App;
