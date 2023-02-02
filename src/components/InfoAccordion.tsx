import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Stack, TextareaAutosize } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
    title: string;
    value: string;
    updateValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxRows: number,
}

const itemStyle = {
    width: 280,
}

export default function InfoAccordion({title, value, updateValue, maxRows}: IProps) {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion 
        expanded={expanded === 'body'} 
        onChange={handleChange('body')}
        sx={itemStyle}
        >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="bodybh-content"
            id="bodybh-header"
            >
            <Typography>
                {title}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="column" spacing={0.2} alignItems="center">
                    <TextareaAutosize
                        maxRows={maxRows}
                        style={{ width: 220 }}
                        value={value}
                        onChange={updateValue}
                    />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );

}