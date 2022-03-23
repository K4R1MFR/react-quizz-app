import React, { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        async function getLeaderboard() {
            let { data, error, status } = await supabase
                .from('Leaderboard')
                .select('id, created_at, name, score, outOf');

            setLeaderboardData(data)
            console.log('Supabase --> ', 'data: ', data, 'error: ', error, 'status: ', status);
        }

        getLeaderboard();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const entryElements = leaderboardData.map(entry => <div key={entry.id} >{entry.name} - score: {entry.score} out of {entry.outOf}</div>)
    return (
        <div className='leaderboard' >
            <h3>Leaderboard</h3>
            {leaderboardData < 1 ?
                '' :
                <div>
                    {entryElements}
                </div>}

        </div>
    )
}