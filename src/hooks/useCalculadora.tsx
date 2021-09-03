import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    const [numero, setNumero] = useState('0');
    
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    
    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }
    const armarNumero = ( numeroTexto: string ) => {
        if( numero.includes('.') && numeroTexto === '.' ) return;
        if( numero.startsWith('0') || numero.startsWith('-0')) {
            //Punto decimal
            if ( numeroTexto === '.') {
                setNumero( numero + numeroTexto );
                //Evaluar si es otro cero, y hay un punto
            } else if( numeroTexto === '0' && numero.includes('.') ){
                setNumero(numero + numeroTexto);
                //Evaluar es distinto de cero, y no tiene un punto
            } else if( numeroTexto !== '0' && !numero.includes('.') ){
                setNumero(numeroTexto);
                //Evitar el 0000.0
            } else if( numeroTexto === '0' && !numero.includes('.') ){
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto);
            }

        } else {
            setNumero(numero + numeroTexto);
        }
    }
    const positivoNegativo = () => {
        if( numero.includes('-') ) {
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );
        }
    }
    const btnDelete = () => {
        let negativo = '';
        let numeroTemp = numero;
        if ( numero.includes('-') ) {
            negativo = '-';
            numeroTemp = numero.substr(1);
        }
        
        if( numeroTemp.length > 1 ) {
            setNumero( negativo + numeroTemp.slice(0, -1) );
        } else {
            setNumero('0');
        }
    }
    const cambiarNumPorAnterior = () => {
        if( numero.includes('.') ) {
            setNumeroAnterior( numero.slice(0, -1) );
        } else {
            setNumeroAnterior( numero );
        }
        setNumero('0');
    }
    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }
    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }
    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }
    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }
    

    const carcular = () => {
        const num1 = Number( numeroAnterior );
        const num2 = Number( numero );
        switch ( ultimaOperacion.current ) {
            case Operadores.sumar:
                setNumero(`${ num1 + num2 }`);
                break;
            case Operadores.restar:
                setNumero(`${ num1 - num2 }`);
                break;
            case Operadores.multiplicar:
                setNumero(`${ num1 * num2 }`);
                break;
            case Operadores.dividir:
                if(num2 !== 0){
                    setNumero(`${ num1 / num2 }`);
                } else {
                    Alert.alert('No se puede dividir entre cero');
                }
                break;
        }
        if(num2 !== 0){
            setNumeroAnterior('0');
        }
    }
    return {
        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        carcular
    }
    
}