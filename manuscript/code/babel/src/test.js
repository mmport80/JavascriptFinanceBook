const f = x =>
        x-1 < 0 ?
                0
                :
                x + f (x-1);