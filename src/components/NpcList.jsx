import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import NpcListItem from "./NpcListItem";

const NpcList = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    const getGames = async () => {
        const response = await fetch("http://localhost:3002/v1/npcs", {
            method: "GET",
        });
        const data = await response.json();
        setGames(data);
    };

    const createNewGame = async () => {
        navigate("/tactical/creation");
    }

    useEffect(() => {
        getGames();
    }, []);


    return (
        <div>
            <div class="tactical-game-list-actions">
                <Stack spacing={2} direction="row" sx={{
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                }}>
                    <Button variant="contained" onClick={createNewGame}>New</Button>
                </Stack>
            </div>
            <div class="tactical-game-list">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {games.map((item) => (
                        <NpcListItem key={item.id} game={item} />
                    ))}
                </List>
            </div>
        </div>
    );
}

export default NpcList;