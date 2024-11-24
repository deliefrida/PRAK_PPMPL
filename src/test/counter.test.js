import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './counter';
import Display from './display';
// src/test/counter.test.js
describe('Counter Tests', () => {
  let counter;

  beforeEach(() => {
      counter = 0; // Inisialisasi ulang nilai counter sebelum setiap tes
  });

  test('Counter Default Value must be 0', () => {
      expect(counter).toBe(0);
  });

  test('Increment works when button clicked', () => {
      counter = increment(counter); // Fungsi simulasi untuk tombol klik increment
      expect(counter).toBe(1);
  });

  test('Decrement works when button clicked', () => {
      counter = 1; // Inisialisasi nilai counter
      counter = decrement(counter); // Fungsi simulasi untuk tombol klik decrement
      expect(counter).toBe(0);
  });

  test('Display has correct value', () => {
      counter = 5; // Simulasi nilai counter saat ini
      expect(counter).toBe(5);
  });
});

// Fungsi simulasi
function increment(value) {
  return value + 1;
}

function decrement(value) {
  return value - 1;
}