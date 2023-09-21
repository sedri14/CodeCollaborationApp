import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function App() {
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
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={codeBlock.title}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      )}
    </div>
  );
}

export default App;
