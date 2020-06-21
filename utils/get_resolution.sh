
CURRENT_RESOLUTION_FULL=$(tvservice -s | awk '{split($0,a,",");print a[2]}');
CURRENT_RESOLUTION=$(echo $CURRENT_RESOLUTION_FULL | awk -F" " '{print $1}');
CURRENT_RESOLUTION_X=$(echo $CURRENT_RESOLUTION | awk -F "x" '{print $1}');
CURRENT_RESOLUTION_Y=$(echo $CURRENT_RESOLUTION | awk -F "x" '{print $2}');
echo $CURRENT_RESOLUTION_X;
echo $CURRENT_RESOLUTION_Y;
