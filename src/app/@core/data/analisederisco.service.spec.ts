import { TestBed, inject } from "@angular/core/testing";
import { AnaliseDeRiscoService, CriterioResposta } from "./analisederisco.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { CriterioAnalise } from "../../models/criterioanalise.model";
import { Risco } from "../../models/risco.enum";
import { Resposta } from "../../models/resposta.model";


fdescribe('AnaliseDeRiscoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpClient,
                HttpHandler,
                AnaliseDeRiscoService
            ]
        });
    });

    function getCriterio(){
        let criterio1: CriterioAnalise = new CriterioAnalise();
            criterio1.obrigatorio = true;
            criterio1.peso = 5;
            criterio1.respostas = [
                {
                    id: 1,
                    version: 1,
                    resposta: 'Sim',
                    risco: Risco.ATR
                },
                {
                    id: 2,
                    version: 1,
                    resposta: 'Não',
                    risco: Risco.BXR
                },
            ];
        return criterio1;
    }

    it('calculo risco 1 criterio', inject([AnaliseDeRiscoService], (service: AnaliseDeRiscoService) => {
        
        expect(service).toBeTruthy();
        
        let criterio1 = getCriterio();

        let respostas: CriterioResposta[] = [
            {criterio: criterio1, resposta: criterio1.respostas[0]},

        ];

        var res = service.calculaRisco(respostas);

        expect(res).toBe("100% ATR; 0% BXR; 0% Indefinido; Peso total: 5.");
        
    }));

    
    it('calculo risco 5 criterios', inject([AnaliseDeRiscoService], (service: AnaliseDeRiscoService) => {
        
        expect(service).toBeTruthy();
        
        let criterio1 = getCriterio();
        let criterio2 = getCriterio();
        let criterio3 = getCriterio();
        let criterio4 = getCriterio();
        let criterio5 = getCriterio();

        let respostas: CriterioResposta[] = [
            {criterio: criterio1, resposta: criterio1.respostas[0]}, // alto risco
            {criterio: criterio2, resposta: criterio2.respostas[1]}, // baixo risco
            {criterio: criterio3, resposta: criterio3.respostas[1]}, // baixo risco
            {criterio: criterio4, resposta: criterio4.respostas[1]}, // baixo risco
            {criterio: criterio5, resposta: criterio5.respostas[0]}, // alto risco
        ];

        var res = service.calculaRisco(respostas);

        expect(res).toBe("40% ATR; 60% BXR; 0% Indefinido; Peso total: 25.");
        
    }));


    it('calculo com criterios indefinidos', inject([AnaliseDeRiscoService], (service: AnaliseDeRiscoService) => {
        
        expect(service).toBeTruthy();
        
        let criterio1 = getCriterio();
        let criterio2 = getCriterio();
        let criterio3 = getCriterio();
        let criterio4 = getCriterio();
        let criterio5 = getCriterio();

        let respostas: CriterioResposta[] = [
            {criterio: criterio1, resposta: criterio1.respostas[0]}, // alto risco
            {criterio: criterio2, resposta: criterio2.respostas[1]}, // baixo risco
            {criterio: criterio3, resposta: criterio3.respostas[1]}, // baixo risco
            {criterio: criterio4, resposta: null}, // baixo risco
            {criterio: criterio5, resposta: null}, // alto risco
        ];

        var res = service.calculaRisco(respostas);

        expect(res).toBe("20% ATR; 40% BXR; 40% Indefinido; Peso total: 25.");
        
    }));


});



