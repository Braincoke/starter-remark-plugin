// Import remark to parse markdown
const remark = require('remark')
// Import our plugin to add prefix to h1
const plugin = require('..')
const fs = require('fs')
const path = require('path')

test('adds BREAKING to h1 headings', () => {
  const inputString = [
    '# New virus reaches Europe',
    '',
    '## Origin',
    '',
    'There is no known origin as of today',
  ].join('\n')

  const expectedString = [
    '# BREAKING New virus reaches Europe',
    '',
    '## Origin',
    '',
    'There is no known origin as of today',
    ''
  ].join('\n')

  // Create our processor with our plugin
  const processor = remark()
  .use(plugin)

  const resultString = processor.processSync(inputString).toString()
  expect(resultString).toEqual(expectedString)
})


test('adds BREAKING to h1 in fixtures', () => {
  const before = fs.readFileSync(path.resolve(__dirname,'fixtures/before.md'), 'utf8')
  const after = fs.readFileSync(path.resolve(__dirname,'fixtures/after.md'), 'utf8')

  const result = remark().use(plugin).processSync(before)
  expect(result.contents).toEqual(after)
})