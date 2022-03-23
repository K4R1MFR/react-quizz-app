import React, { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        async function getLeaderboard() {
            let { data, error, status } = await supabase
                .from('Leaderboard')
                .select('id, created_at, name, score, outOf');

            let orderedLeaderboard = data.sort(function (a, b) {
                return a.score - b.score;
            });
            let firstTenData = orderedLeaderboard.reverse().slice(0, 10)

            setLeaderboardData(firstTenData)
            console.log('Supabase --> ', 'data: ', data, 'error: ', error, 'status: ', status);
        }

        getLeaderboard();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const entryElements = leaderboardData.map((entry, index) => (
        <div key={entry.id} >
            {index + 1}................{entry.name} - {entry.score} out of {entry.outOf}
        </div>
    ))
    return (
        <div>
            <h3>Leaderboard - Top 10</h3>
            {leaderboardData < 1 ?
                '' :
                <div className='leaderboard'>
                    {entryElements}
                </div>}

        </div>
    )
}