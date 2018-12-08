import { Turma } from "../models/Turma";
import { Pessoa } from "../models/Pessoa";
import { Roteiro } from "../models/Roteiro";

export class RepositorioTurma {
    private _turmas: Turma[];

    public constructor() {
        this._turmas = [];
    }

    get turmas(): Turma[] {
        return this._turmas;
    }

    public getTurma(turmaId: string): Turma {
        const t = this.findById(turmaId);
        if (t) {
            return t;
        }
        return null;
    }

    public getTurmasAluno(cpf: string): Turma[] {
        return this.turmas.filter(e => e.alunos.find(value => value.cpf === cpf));
    }

    public getInstrutores(turmaId: string): Pessoa[] {
        const t = this.findById(turmaId);
        if (t) {
            return t.instrutores;
        }
        return null;
    }

    public hasInstrutor(turmaId: string, cpf: string): boolean {
        const is = this.getInstrutores(turmaId);
        if (is) {
            const i = this.findByCpf(is, cpf);
            if (i) {
                return true;
            }
        }
        return false;
    }

    public postInstrutor(turmaId: string, instrutor: Pessoa): boolean {
        const t = this.findById(turmaId);
        if (t) {
            if (!this.hasInstrutor(turmaId, instrutor.cpf)) {
                t.instrutores.push(instrutor);
                return true;
            }
        }
        return false;
    }

    public removeInstrutor(turmaId: string, cpf: string): boolean {
        if (this.hasInstrutor(turmaId, cpf)) {
            const t = this.findById(turmaId);
            var i: number = t.instrutores.findIndex(p => p.cpf === cpf);
            t.instrutores.splice(i, 1);
            return true;
        }
        return false;
    }

    public getAlunos(turmaId: string): Pessoa[] {
        const t = this.findById(turmaId);
        if (t) {
            return t.alunos;
        }
        return null;
    }

    public hasAluno(turmaId: string, cpf: string): boolean {
        const as = this.getAlunos(turmaId);
        if (as) {
            const a = this.findByCpf(as, cpf);
            if (a) {
                return true;
            }
        }
        return false;
    }

    public postAluno(turmaId: string, aluno: Pessoa): boolean {
        const t = this.findById(turmaId);
        if (t) {
            if (!this.hasAluno(turmaId, aluno.cpf)) {
                t.alunos.push(aluno);
                return true;
            }
        }
        return false;
    }

    public removeAluno(turmaId: string, cpf: string): boolean {
        if (this.hasAluno(turmaId, cpf)) {
            const t = this.findById(turmaId);
            var i: number = t.alunos.findIndex(p => p.cpf === cpf);
            t.alunos.splice(i, 1);
            return true;
        }
        return false;
    }

    public getRoteiros(turmaId: string): Roteiro[] {
        const t = this.findById(turmaId);
        if (t) {
            return t.roteiros;
        }
        return null;
    }

    public hasRoteiro(turmaId: string, nome: string): boolean {
        const rs = this.getRoteiros(turmaId);
        if (rs) {
            const r = this.findByRoteiroName(rs, nome);
            if (r) {
                return true;
            }
        }
        return false;
    }

    public postRoteiro(turmaId: string, roteiro: Roteiro): boolean {
        const t = this.findById(turmaId);
        if (t) {
            if (!this.hasRoteiro(turmaId, roteiro.nome)) {
                t.roteiros.push(roteiro);
                return true;
            }
        }
        return false;
    }

    public removeRoteiro(turmaId:string, nome): boolean {
        if (this.hasRoteiro(turmaId, nome)) {
            const t = this.findById(turmaId);
            var i: number = t.roteiros.findIndex(p => p.nome === nome);
            t.roteiros.splice(i, 1);
            return true;
        }
        return false;
    }

    public cadastrar(turma: Turma): boolean {
        if(!this.findById(turma.id)) {
            this._turmas.push(turma);
            return true;
        }
        return false;
    }

    public atualizar(turma: Turma): boolean {
        const t = this.findById(turma.id);
        if (t) {
            t.copyFrom(turma);
            return true;
        }
        return false;
    }

    public remover(turmaId: string): boolean {
        const t = this.findById(turmaId);
        if (t) {
            var i: number = this._turmas.findIndex(x => x.id === turmaId);
            this._turmas.splice(i, 1);
            return true;
        }
        return false;
    }

    private findById(id: string): Turma | undefined {
        return this._turmas.find(value => value.id === id);
    }

    private findByCpf(arr: Pessoa[], cpf: string): Pessoa | undefined {
        return arr.find(value => value.cpf === cpf);
    }

    private findByRoteiroName(arr: Roteiro[], nome: string): Roteiro | undefined {
        return arr.find(value => value.nome === nome);
    }
}