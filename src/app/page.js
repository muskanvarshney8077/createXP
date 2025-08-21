import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { DataProvider } from "./context/Context";
import "./page.module.css";
export default function Home() {
  return (
    <>
      <DataProvider>
        <div>
          <Navbar />
          <Content />
        </div>
      </DataProvider>
    </>
  );
}
