<?php
$user_netid='';
function ptools_acl_to_perms($acl,$owner='none',$app_loca_groups=[]):array{
    global $user_id;

    $combined_perms = 'z';
    foreach($acl as $acl_group =>$acl_perms){
        if($acl_perms == "*"){
            $acl_perms = 'rw';
        }
        if($acl_group == "owner"){
            $acl_group = 'netid_'.$owner;
        }
        if(($acl_group =='anon') && ($owner == 'anon')){
            $combined_perms.=$acl_perms;
        }
        if(isset($app_loca_groups[$acl_group])){
            if(in_array($user_netid,$app_local_groups[$acl_group])){
                $combined_perms.=$acl_perms;
            }
        }
        if($acl_group == $user_netid){
            $combined_perms.=$acl_perms;
        }
        if($acl_group == 'everyone'){
            $combined_perms.=$acl_perms;
        }
        $perms_array=[];
        foreach (count_chars($combined_perms,1) as $char=>count){
            $perms_array[chr($char)]å = $count;
        }
        return $perms_array;
    }
}
?>