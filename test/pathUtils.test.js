import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { toImportSpecifier } from '../utils/pathUtils.js';

describe('toImportSpecifier', () => {
  it('should convert Windows absolute paths to file:// URLs', () => {
    const windowsPath = 'C:\\repo\\file.js';
    const result = toImportSpecifier(windowsPath);
    assert.equal(result, 'file:///C:/repo/file.js');
  });

  it('should convert Unix absolute paths to file:// URLs', () => {
    // On Unix-like systems, /repo/file.js is absolute
    // On Windows, we need a drive letter for it to be absolute
    const isWindows = process.platform === 'win32';
    const testPath = isWindows ? 'C:\\repo\\file.js' : '/repo/file.js';
    const expected = isWindows ? 'file:///C:/repo/file.js' : 'file:///repo/file.js';

    const result = toImportSpecifier(testPath);
    assert.equal(result, expected);
  });

  it('should preserve relative paths unchanged', () => {
    const relativePath = './local-module.js';
    const result = toImportSpecifier(relativePath);
    assert.equal(result, './local-module.js');
  });

  it('should preserve package names unchanged', () => {
    const packageName = 'express';
    const result = toImportSpecifier(packageName);
    assert.equal(result, 'express');
  });

  it('should handle paths with special characters', () => {
    const pathWithSpaces = 'C:\\Program Files\\myapp\\file.js';
    const result = toImportSpecifier(pathWithSpaces);
    assert.equal(result, 'file:///C:/Program%20Files/myapp/file.js');
  });
});
