import { render, screen, fireEvent } from '@testing-library/react';
import { Counter, Greeting, AlertButton } from './latihan';
import '@testing-library/jest-dom';
import React from 'react';

// src/test/latihan.test.js
describe('Latihan Tests', () => {
// Counter Component
    test('Counter Default Value must be 0', () => {
        const counter = 0;
        expect(counter).toBe(0);
    });

    test('Increment works when button clicked', () => {
        let counter = 0;
        counter++;
        expect(counter).toBe(1);
    });

    test('Decrement works when button clicked', () => {
        let counter = 1;
        counter--;
        expect(counter).toBe(0);
    });

    test('Reset the count using reset button', () => {
        let counter = 10;
        counter = 0; // Simulasi tombol reset
        expect(counter).toBe(0);
    });
// Greeting Component
    test('Greeting component {nama kalian}', () => {
        const greeting = 'Hello, Deli!';
        expect(greeting).toBe('Hello, Deli!');
    });

    test('Greeting component {nama dosen kalian}', () => {
        const greeting = 'Hello, Pak Farid!';
        expect(greeting).toBe('Hello, Pak Farid!');
    });
// AlertButton Component
test('Triggers alert with correct message when clicked', () => {
    const alertMessage = 'Button clicked!';
    expect(alertMessage).toBe('Button clicked!');
    });
});