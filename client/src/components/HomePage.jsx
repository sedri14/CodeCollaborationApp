import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const HomePage = () => {

const socket = io.connect("http://localhost:3001")
const navigate = useNavigate();

  const [codeBlocks, setCodeBlocks] = useState([
    {
      id: 1,
      title: "Conditional Statement",
      code: `
      if (condition) {
        // Code block to execute when the condition is true
      } else {
        // Code block to execute when the condition is false
      }
          `,
    },
    {
      id: 2,
      title: "Looping Example",
      code: `
      for (let i = 0; i < 5; i++) {
        // Code block that runs 5 times
      }
          `,
    },
    {
      id: 3,
      title: "Function Declaration",
      code: `
      function greet(name) {
        return "Hello, " + name + "!";
      }
          `,
    },
    {
      id: 4,
      title: "Array Manipulation",
      code: `
      const numbers = [1, 2, 3, 4, 5];
      const doubled = numbers.map(num => num * 2);
          `,
    },
  ]);



  function handleItemClick(id, code) {
    console.log(`***Code block with id ${id} was clicked***`);
    navigate(`/codeblock/${id}`, {state: {code}});
  }

  return (
    <div>
      <h2>Choose code block</h2>
      {typeof codeBlocks === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="code blocks list">
            <List>
              {codeBlocks.map((codeBlock, i) => (
                <ListItem key={codeBlock.id} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(codeBlock.id, codeBlock.code)}>
                    <ListItemText primary={codeBlock.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      )}
    </div>
  );
};

export default HomePage;
