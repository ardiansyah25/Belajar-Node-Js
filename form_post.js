var http = require('http');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function (req, res) {
      if (req.url === "/login/" && req.method === "GET") {
            // tampilkan form Login
            fs.readFile('login_form.html', (err, data) => {
                  if (err) {
                        res.writeHead('404',
                              { 'Content-Type': 'text/html' });
                        return res.end("404 Not Found");
                  }
                  // Kirim Form Login Html
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.write(data);
                  res.end();
            });
      }

      if (req.url === "/login/" && req.method === "POST") {
            // ambil data dari form
            var requestBody = '';
            req.on('data', function (data) {
                  requestBody += data;
                  if (requestBody.length > 1e7) {
                        res.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
                        res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
                  }
            });
            req.on('end', function () {
                  var formData = qs.parse(requestBody);

                  if (formData.username === "ardi" && formData.password === "password") {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write('<h2>Selamat datang bos!</h2> ');
                        res.write('<p>username: ' + formData.username + '</p>');
                        res.write('<p>password: ' + formData.password + '</p>');
                        res.write("<a href='/login/'>kembali</a>");
                        res.end();
                  } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write('<h2>Login Gagal!</h2> ');
                        res.write("<a href='/login/'>coba lagi</a>");
                        res.end();
                  }
            });
      }
}).listen(8000);
console.log('server is running on http://localhost:8000');