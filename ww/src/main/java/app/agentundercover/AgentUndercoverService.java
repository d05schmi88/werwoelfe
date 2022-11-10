package app.agentundercover;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.Getter;
import model.agentundercover.Daten;
import model.agentundercover.Spieler;

@Service
@Getter
public class AgentUndercoverService {

    private Daten daten = new Daten();

    public void setSpieler(List<Spieler> spieler) {

        daten.setSpieler(spieler);
    }

    public void registriere(String name) {

        daten.registriere(name);
    }

    public void bestaetigeOrt(String name) {

        daten.bestaetigeOrt(name);
    }

    public void neustart() {

        daten.neustart();
    }
}
