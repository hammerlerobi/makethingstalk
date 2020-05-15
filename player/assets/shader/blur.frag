precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex;

uniform vec2 direction;


vec3 getColor(vec2 xy)
{   
  return texture2D(tex, xy).rgb; 
}

void main()
{
    vec2 uv = vTexCoord;
    
    
    const float steps = 32.0;
    float n = 0.;
  
    vec3 sum = getColor(uv) * steps;
    for(float i = 1.0; i < steps; i += 1.0) {
    	sum += getColor(uv + i * .001 * direction) * (steps - i);
    	sum += getColor(uv - i * .001 * direction) * (steps - i);
        n += (steps - i) * 2.;
    }
    
    sum /= n;
  
 
    gl_FragColor = vec4(sum, 1.);
  
}