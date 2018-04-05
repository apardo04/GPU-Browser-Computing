if (turbojs) {
	var foo = turbojs.alloc(1e6);
  var nFactor = 4;
	var sampleIterations = 5;
  for (var i = 0; i < 1e6; i++) foo.data[i] = i;

	//This code is written in an extension of C called GLSL.
  /*turbojs.run(foo, `void main(void) {
    commit(read() * ${nFactor}.);
  }`);*/

	function testTurbo() {
	turbojs.run(foo, `void main(void) {
		vec4 ipt = read();

		float x0 = -2.5 + (3.5 * ipt.r);
		float y0 = ipt.g, x, y, xt, c;

		for(int i = 0; i < ${sampleIterations}; i++) {
			if (x * x + y * y >= 2. * 2.) break;

			xt = x * x - y * y + x0;
			y = 2. * x * y + y0;
			x = xt;
			c++;
		}

		float col = c / ${sampleIterations}.;

		commit(vec4(ipt.rg, col, 0.));
	}`);
}

  console.log(foo.data.subarray(0, 5));
}
else {
	console.log("no turbo")
}
