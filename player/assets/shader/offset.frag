precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D org;
uniform sampler2D blur;

uniform vec3 colorA;
uniform vec3 colorB;

float hash( float n )
{
	return fract( sin(n)*54671.57391);
}

float noise( vec2 p )
{
	return hash( p.x + p.y * 57.1235);
}

vec3 getOrgColor(vec2 xy)
{
      
  return texture2D(org, xy).rgb;
      
}

vec3 getBluredColor(vec2 xy)
{
      
  return texture2D(blur, xy).rgb;
      
}

void main()
{
  
  vec2 uv = vTexCoord;
    
  
  vec3 bluredColor = getBluredColor(uv);

  float brg = bluredColor.r;
  float brg_noise = (noise(uv) + brg) / 2.;
    
  vec3 orgColor = getOrgColor(uv) * (1.0 + noise(uv));
  vec3 edge = vec3(1., 1., 1.) * step(.5, brg_noise);
  vec3 error = noise(uv) * colorA;

  

  vec3 color = orgColor * .4  + edge * .4 - error * 2.5;
  //color = mix(colorB, colorA, color);
    
    
  vec3 cA = mix(colorA, colorA * 1.125, uv.x); 
  vec3 cB = mix(colorB, colorB * 1., uv.y); 

  color = mix(cB, cA, color);

  // gradient
  //color *= 1.5 - exp(.75 - uv.y) * .25;
    
  //vec3 color = vec3(1., 1., 1.);
    
  gl_FragColor = vec4(color,1.0);
}