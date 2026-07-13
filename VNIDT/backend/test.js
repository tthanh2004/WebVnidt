async function test() {
  try {
    const setupRes = await fetch('http://localhost:3000/api/auth/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@vnidt.vn', password: 'VNiDT@2026' })
    });
    console.log('Setup:', await setupRes.json());

    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@vnidt.vn', password: 'VNiDT@2026' })
    });
    console.log('Login:', await loginRes.json());
  } catch (e) {
    console.error(e);
  }
}
test();
