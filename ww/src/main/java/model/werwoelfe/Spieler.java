package model.werwoelfe;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Spieler {

    private String name;
    private boolean sollSterben;
    private boolean lebend;

    public void setSollSterben(boolean sollSterben) {

        this.sollSterben = sollSterben;
    }

    public void setLebend(boolean lebend) {

        this.lebend = lebend;
    }
}
