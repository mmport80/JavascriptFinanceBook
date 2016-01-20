const f = y =>
        y-1 < 0 ?
                0
                :
                y + f (y-1);