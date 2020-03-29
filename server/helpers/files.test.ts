import { asserts } from '../deps.ts';
import { getFileOrIndexHtml } from './files.ts';
const { assertEquals, assertNotEquals } = asserts;

const testDir = `${Deno.cwd()}/helpers/testDirectory`;

Deno.test(async function shouldGetHtml() {
  const gottenFile = await getFileOrIndexHtml(testDir, 'index.html');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'html');
  gottenFile?.file.close();
});

Deno.test(async function shouldHandleLeadingSlash() {
  const gottenFile = await getFileOrIndexHtml(testDir, '/index.html');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'html');
  gottenFile?.file.close();
});

Deno.test(async function shouldGetJs() {
  const gottenFile = await getFileOrIndexHtml(testDir, 'test.js');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'js');
  gottenFile?.file.close();
});

Deno.test(async function shouldGetBuiltJs() {
  const gottenFile = await getFileOrIndexHtml(testDir, 'test.123123.js');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'js');
  gottenFile?.file.close();
});

Deno.test(async function shouldGetPng() {
  const gottenFile = await getFileOrIndexHtml(testDir, 'test.png');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'png');
  gottenFile?.file.close();
});

Deno.test(async function shouldGetCss() {
  const gottenFile = await getFileOrIndexHtml(testDir, 'test.css');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'css');
  gottenFile?.file.close();
});

Deno.test(async function shouldDefaultHtml() {
  const gottenFile = await getFileOrIndexHtml(testDir, 'nonExistent');
  assertNotEquals(gottenFile, null);
  assertEquals(gottenFile!.fileType, 'html');
  gottenFile?.file.close();
});
