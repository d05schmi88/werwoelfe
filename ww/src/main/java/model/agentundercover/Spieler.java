package model.agentundercover;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class Spieler {

    private String name;
    @Setter
    private boolean registriert;
    @Setter
    private String ort;
    @Setter
    private boolean bestaetigt;
}
