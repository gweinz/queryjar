import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useEffect, useState } from "react";
import ResultList from "./ResultList";
import { ESettings, loadJar, loadSettings, Query } from "../utils/crud";
import SkeletonAnimation from "./LoadingAnimations";

const THRESHOLD = 5;

export default function Search() {
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [displayQueries, setDisplayQueries] = useState<Query[] | []>([]);
    const [allQueries, setAllQueries] = useState<Query[] | []>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [copyAsCTE, setCopyAsCTE] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (allQueries) {
            const updatedList = allQueries.filter((data) => JSON.stringify(data).toLowerCase().indexOf(term.toLowerCase()) !== -1);
            setDisplayQueries(updatedList.slice(0, THRESHOLD));
        }
    };
 
    const fetchAllData = useCallback(async () => {
        const data = await loadJar();
        const settings_ = await loadSettings();
        if (settings_) {
            if (settings_.includes(ESettings.CTE)) setCopyAsCTE(true);
        }
        setAllQueries(data);
        if (data) {
            // Show last N added to Jar and reverse ot
            const display = data.slice(-THRESHOLD).reverse();
            setDisplayQueries(display);
        }
      }, []);

    useEffect(() => {
        setLoadingData(true);
        fetchAllData();
        setLoadingData(false);

        // setTimeout(() => {
        //     setLoadingData(false);
        // }, 200)
    }, [fetchAllData]);

    const resultBody = () => {
        if (loadingData) {
            return (
                <SkeletonAnimation width={300} num={5}/>
            );
        } else {
            return (
                <ResultList queries={displayQueries} handleRefresh={fetchAllData} copyAsCTE={copyAsCTE} />
            );
        }
    };

  return (
    <div>
        <Grid item> 
            <TextField
                label=""
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                multiline
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
        </Grid>
        <Grid item>
            {resultBody()}
        </Grid>
            
    </div>
  );
};

