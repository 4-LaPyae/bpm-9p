import { Popover, Stack, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import MenuPopover from "../../assets/theme/MenuPopover";
import SimpleInput from "../SimpleInput";
import { data } from "./data";
import { useMemo } from "react";
import IconWrap from "../IconWrap";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "./icons";

function index({ select, setSelect }) {
    const [search, setSearch] = useState("");
    const onSearch = (e) => {
        setSearch(e.target.value);
    };
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log("change");
        setItems(
            icons.filter((item) =>
                item.name.includes(String(search).toLowerCase())
            )
        );
    }, [search]);

    const clicked = (i) => {
        setSelect(`${i.type} ${i.name}`);
    };

    return (
        <MenuPopover
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => {
                setOpen(false);
                setSearch("");
            }}
        >
            <SimpleInput
                name="icon"
                placeholder="Select Icon"
                value={select ? String(select) : ""}
                inputProps={{
                    readOnly: true,
                }}
                fullWidth
                error={false}
            />
            <Box sx={{ padding: "10px", background: "#f5f5f5" }}>
                <Box>
                    <SimpleInput
                        placeholder="Search Icon"
                        fullWidth
                        value={search}
                        onChange={onSearch}
                    />
                </Box>
                <Box
                    sx={{ width: 300, height: 200, overflow: "scroll", mt: 3 }}
                >
                    <Grid container spacing={2} textAlign="center">
                        {items?.map((i) => (
                            <Grid
                                item
                                xs={3}
                                onClick={() => {
                                    clicked(i);
                                    setOpen(false);
                                    console.log("lee");
                                }}
                                key={`${i.name} ${i.type}`}
                            >
                                <IconWrap
                                    class={`${i.type} ${i.name}`}
                                    size="lg"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </MenuPopover>
    );
}

export default index;
