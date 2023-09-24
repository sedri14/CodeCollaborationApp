import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SERVER_ADDRESS } from "../constants";

const HomePage = () => {

  const navigate = useNavigate();

  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await axios.get(SERVER_ADDRESS + "codeblocks");
        setCodeBlocks(response.data);
      } catch (error) {
        console.error("Error fetching codeblocks:", error);
      }
    };

    fetchCodeBlocks();
  }, []);

  function handleItemClick(id) {
    navigate(`/codeblock/${id}`);
  }

  return (
    <div>
      <h2>Choose Code Block</h2>
      {typeof codeBlocks === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="code blocks list">
            <List>
              {codeBlocks.map((codeBlock) => (
                <ListItem key={codeBlock._id} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(codeBlock._id)}>
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
