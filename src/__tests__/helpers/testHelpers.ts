export const testInCI = process.env.CI ? test : test.skip
