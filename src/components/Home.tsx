import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { loadJar, Query } from "../utils/crud";
import AllQueries from "./AllQueries";
import Settings from "./Settings";

export default function Home() {

    const [allQueries, setAllQueries] = useState<Query[] | []>([]);

    const fetchInfo = useCallback(async () => {
        const data = await loadJar();
        if (data) {
            const sorted = data.sort((a, b) => a.name.localeCompare(b.name, undefined, { caseFirst: "upper" }));
            setAllQueries(sorted);
        }
      }, []);

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo]);


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <Settings />
            </Grid>
            <Grid item>
                <AllQueries directory={allQueries} />
            </Grid>
        </Grid>
  );
}